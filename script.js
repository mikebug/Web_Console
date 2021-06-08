var term = new Terminal({
    cursorBlink: "block"
});
const ws = new WebSocket("ws://localhost:3000", "echo-protocol");
var curr_line = "";
var entries = [];
term.open(document.getElementById("terminal"));
term.write("              ,---------------------------," + "\r\n");
term.write("              |  ----------------------   |" + "\r\n");
term.write("              | |                       | |" + "\r\n");
term.write("              | |         Hi            | |" + "\r\n");
term.write("              | |   ***Type Help***     | |" + "\r\n");
term.write("              | |         by            | |" + "\r\n");
term.write("              | |   Michael Buglione    | |" + "\r\n");
term.write("              |  _______________________  |" + "\r\n");
term.write("              |___________________________|" + "\r\n");
term.write("            ,--- ______     []     _______/------," + "\r\n");
term.write("          /          ______________            /|" + "\r\n");
term.write("        /___________________________________ /  | ___" + "\r\n");
term.write("        |                                   |   |    )" + "\r\n");
term.write("        |  _ _ _                 [-------]  |   |   (" + "\r\n");
term.write("        |  o o o                 [-------]  |  /    _)_" + "\r\n");
term.write("        |__________________________________ |/     /  /" + "\r\n");
term.write("        /-------------------------------------/|  ( )/" + "\r\n");
term.write("       /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /" + "\r\n");
term.write("      /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /" + "\r\n");
term.write("      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n");
term.write("\r\n");
term.write("\r\n");
term.write("\r\n");
term.write("term %| ");
term.prompt = ( ) => {
    if (curr_line) {
        let data = { method: "command", command: curr_line };
        ws.send(JSON.stringify(data));
        }
    };
    term.prompt();

    // Receive data from socket
    ws.onmessage = msg => {
        term.write("\r\n" + JSON.parse(msg.data).data);
        curr_line = "";
    };

    term.on("key", function(key,ev){
        //Enter
        if(ev.keyCode === 13){
            if(curr_line){
                entries.push(curr_line);
                if(curr_line == "ls"){
                    term.write("\r\n");
                    term.write("test.py");
                    term.write("\r\n");
                    term.write("Problem_1.txt");
                }
                else if(curr_line == "help"){
                    term.write(
                        "\r\n" +
                        "Use the following shell commands:" +
                        "\r\n" +
                        "cd	change directory [dir_name]" +
                        "\r\n" +
                        "cat	print file [file_name]" +
                        "\r\n" +
                        "deleteme	delete all of your data associated with foobar" +
                        "\r\n" +
                        "edit	open file in editor [file_name]" +
                        "\r\n" +
                        "feedback	provide feedback on foobar" +
                        "\r\n" +
                        "less	print a file a page at a time [file_name]" +
                        "\r\n" +
                        "ls	list directory contents [dir_name]" +
                        "\r\n" +
                        "request	request new challenge" +
                        "\r\n" +
                        "status	print progress" +
                        "\r\n" +
                        "submit	submit final solution file for assessment [file_name]" +
                        "\r\n" +
                        "verify	runs tests on solution file [file_name]"
                    );
                }
                term.write("\r\n");
                term.prompt();
                curr_line = "";
                term.write("term %| ")
            }
        }
        else if(ev.keyCode === 8){
            // Backspace
            if (curr_line){
                curr_line = curr_line.slice(0, curr_line.length - 1);
                term.write("\b \b");
            }
        }
        else{
            curr_line += key;
            term.write(key);
        }
    });
    
