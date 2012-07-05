
var pythonWrapper_1 = 
'import sys' + '\n' +
'import ast' + '\n' +
'import types' + '\n' +
'' + '\n' +
'class NodeCollector(ast.NodeVisitor):' + '\n' +
'' + '\n' +
'    def __init__(self):' + '\n' +
'        self.nodeList = {}' + '\n' +
'    ' + '\n' +
'    def generic_visit(self, node):' + '\n' +
'        if \'lineno\' in dir(node) and not node.lineno in self.nodeList:' + '\n' +
'                self.nodeList[node.lineno] = node' + '\n' +
'                ' + '\n' +
'        ast.NodeVisitor.generic_visit(self, node)' + '\n' +
'' + '\n' +
'class NameFinder(ast.NodeVisitor):' + '\n' +
'    ' + '\n' +
'    def __init__(self):' + '\n' +
'        self.names = {}' + '\n' +
'    ' + '\n' +
'    def visit(self, node):' + '\n' +
'        ast.NodeVisitor.visit(self, node)' + '\n' +
'    ' + '\n' +
'    def visit_FunctionDef(self, node):' + '\n' +
'        self.visit(node.args)' + '\n' +
'        ' + '\n' +
'    def visit_For(self, node):' + '\n' +
'        self.visit(node.target)' + '\n' +
'        self.visit(node.iter)' + '\n' +
'        ' + '\n' +
'        for stmt in node.orelse:' + '\n' +
'            self.visit(stmt)' + '\n' +
'            ' + '\n' +
'    def visit_With(self, node):' + '\n' +
'        self.visit(node.context_expr)' + '\n' +
'        self.visit(node.optional_vars)' + '\n' +
'        ' + '\n' +
'    def visit_While(self, node):' + '\n' +
'        self.visit(node.test)' + '\n' +
'        ' + '\n' +
'        for stmt in node.orelse:' + '\n' +
'            self.visit(stmt)' + '\n' +
'            ' + '\n' +
'    def visit_Name(self, node):' + '\n' +
'        self.names[node.id] = (node.lineno, node.col_offset)' + '\n' +
'    ' + '\n' +
'    def visit_If(self, node):' + '\n' +
'        self.visit(node.test)' + '\n' +
'        ' + '\n' +
'        for stmt in node.orelse:' + '\n' +
'            self.visit(stmt)' + '\n' +
'    ' + '\n' +
'    def generic_visit(self, node):' + '\n' +
'        ast.NodeVisitor.generic_visit(self, node)' + '\n' +
'' + '\n' +
'srcStart = -1 ' + '\n' +
'prefix = \'DUMP_PREFIX\'' + '\n' +
'def dump_frame(frame, event, arg):' + '\n' +
'    global srcStart' + '\n' +
'' + '\n' +
'    backFrame = frame.f_back' + '\n' +
'    ' + '\n' +
'    if not (event == \'call\' or event == \'line\'):' + '\n' +
'        return dump_frame' + '\n' +
'        ' + '\n' +
'    if (event == \'call\' and frame.f_code.co_name == \'container_no_one_should_have_this_name_oh_god\'):' + '\n' +
'        srcStart = frame.f_lineno' + '\n' +
'        return dump_frame' + '\n' +
'    ' + '\n' +
'    lineno = frame.f_lineno - srcStart' + '\n' +
'    ' + '\n' +
'    print prefix , \'INSTRUCTION START\'' + '\n' +
'    ' + '\n' +
'    if not lineno+1 in nodeCollection.nodeList:' + '\n' +
'        print prefix,  \'LINE\', str(lineno)' + '\n' +
'    else:' + '\n' +
'        lineList = sorted(nodeCollection.nodeList.keys())' + '\n' +
'        firstSpot = lineList.index(lineno + 1)' + '\n' +
'        if(firstSpot == len(lineList) - 1):' + '\n' +
'            print prefix, \'LINE\', str(lineno), str(lineno)' + '\n' +
'        else:' + '\n' +
'            print prefix, \'LINE\', str(lineno), lineList[firstSpot + 1] - 2' + '\n' +
'            ' + '\n' +
'    ' + '\n' +
'    print prefix, \'EVENT\', event' + '\n' +
'    ' + '\n' +
'    if event == \'call\':' + '\n' +
'        pass' + '\n' +
'    ' + '\n' +
'    if(event == \'line\' or event == \'call\'):' + '\n' +
'        vars = frame.f_locals' + '\n' +
'        ' + '\n' +
'        upper = frame.f_back' + '\n' +
'        while upper != None:' + '\n' +
'            if \'__name__\' in upper.f_locals and upper.f_locals[\'__name__\'] == \'__main__\':' + '\n' +
'                break' + '\n' +
'            ' + '\n' +
'            for k, v in upper.f_locals.iteritems():' + '\n' +
'                if not k in vars:' + '\n' +
'                    vars[k] = v' + '\n' +
'            ' + '\n' +
'            upper = upper.f_back' + '\n' +
'            ' + '\n' +
'        foundNames = NameFinder()' + '\n' +
'        foundNames.visit(nodeCollection.nodeList[lineno + 1])' + '\n' +
'        ' + '\n' +
'        changeVars = []' + '\n' +
'        for k,v in vars.iteritems():' + '\n' +
'        ' + '\n' +
'            if type(v) is types.FunctionType or \'func_name\' in dir(v):' + '\n' +
'                continue' + '\n' +
'        ' + '\n' +
'            if \'__str__\' in dir(v) and k in foundNames.names:' + '\n' +
'                lino, colno = foundNames.names[k]' + '\n' +
'                changeVars.append((k, v, lino - 1, colno))' + '\n' +
'                ' + '\n' +
'        for k, v, lino, colno in sorted(changeVars, key = lambda item: int(item[3])):' + '\n' +
'            print prefix, \'CHANGE_VAR\', k , str(v).replace(\' \', \';:;\') , lino, colno' + '\n' +
'            ' + '\n' +
'            ' + '\n' +
'    print prefix, \'INSTRUCTION END\'' + '\n' +
'    ' + '\n' +
'    for x in range(0, 10000 *';

        
var pythonWrapper_2 =
'):' + '\n' +
'        pass' + '\n' +
'           ' + '\n' +
'    return dump_frame' + '\n' +
'    ' + '\n' +
'src = \'\'\''  + '\n';

var pythonWrapper_3 =
'\'\'\'' + '\n' +
'    ' + '\n' +
'nodeCollection = NodeCollector() ' + '\n' +
'nodeCollection.visit(ast.parse(src))' + '\n' +
'' + '\n' +
'def container_no_one_should_have_this_name_oh_god():' + '\n';

var pythonWrapper_4 =
'' + '\n' +
'try:' + '\n' +
'    sys.settrace(dump_frame)' + '\n' +
'    container_no_one_should_have_this_name_oh_god()' + '\n' +
'except Exception as inst:' + '\n' +
'    lineAdj = 142 # Taken from exceptions, to adjust traceback...' + '\n' +
'    type, value, tb = sys.exc_info()' + '\n' +
'    ' + '\n' +
'    orig_tb = tb' + '\n' +
'    frm = tb.tb_frame' + '\n' +
'    start_printing = False' + '\n' +
'    ' + '\n' +
'    print prefix , \'EXCEPTION\'' + '\n' +
'    print \'Traceback (most recent call last):\'' + '\n' +
'    ' + '\n' +
'    if frm.f_code.co_name == \'container_no_one_should_have_this_name_oh_god\':' + '\n' +
'        start_printing = True' + '\n' +
'        print \'\t\' + \'File "\' + frm.f_code.co_filename + \'", line \' + str(frm.f_lineno - lineAdj) + \' in <stdin>\'' + '\n' +
'    ' + '\n' +
'    while tb.tb_next != None:' + '\n' +
'        tb = tb.tb_next ' + '\n' +
'        ' + '\n' +
'        frm = tb.tb_frame' + '\n' +
'        if frm.f_code.co_name == \'container_no_one_should_have_this_name_oh_god\':' + '\n' +
'            start_printing = True' + '\n' +
'            print \'\t\' + \'File "\' + frm.f_code.co_filename + \'", line \' + str(frm.f_lineno - lineAdj) + \' in <stdin>\'' + '\n' +
'        else:' + '\n' +
'            if not start_printing:' + '\n' +
'                continue' + '\n' +
'              ' + '\n' +
'            print \'\t\' + \'File "\' + frm.f_code.co_filename + \'", line \' + str(frm.f_lineno - lineAdj) + \' in \' + frm.f_code.co_name' + '\n' +
'     ' + '\n' +
'    print type, ":", value' + '\n' +
'finally:' + '\n' +
'    sys.settrace(None)' + '\n';

function inputCallback(callback) {
    // Retrieve Input
    
    var input = prompt("Please enter input:");
    callback(input);
}

var outputBuffer = '';
var programSrc = '';

function outputCallback(output) {
    outputBuffer += output;
    lines = outputBuffer.split('\n');
    
    for(var i = 0; i < lines.length - 1; i++)
    {
        line = lines[i] + '\n';
        processLine(line);
    }
    
    lastLine = lines[lines.length - 1];
    if(!(outputBuffer.substr(outputBuffer.length - 1) === '\n')) // If the last line doesn't end with a newline, its a partial line, ignore it
    {
        outputBuffer = lastLine;
    }
    else
    {
        if(lastLine == '') // empty last line?
            return;
            
        processLine(lastLine + '\n');
    }
}

var prefix = 'DUMP_PREFIX'
function processLine(line) {

    if(line.length < 11) // couldnt possibly be dump command, output
        outputLine(line)
    else if (line.substring(0, 11) == prefix)
        parseDumpCmd(line)
    else
        outputLine(line)
}

var oldLineNum = -1;
var oldLines = {};
var exceptionText = false;

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function parseDumpCmd(line)
{
    var parts = line.substring(0, line.length - 1).split(' ');
    var cmd = parts[1];
    
    if(cmd == 'INSTRUCTION' && parts[2] == 'START') // Reset hilight and restore old line
    {
        
        for(var i in oldLines)
        {
            var ln = parseInt(i);
            codeViewer.clearMarker(ln)
            codeViewer.setLineClass(ln, null, null);
            codeViewer.setLine(ln, oldLines[i]);
        }
        
        oldLines = {};
    }
    else if (cmd == 'LINE') // Hilight new line and store it
    {
        var start = parts[2] - 1;
        var end = parts[3] - 1;
        
        codeViewer.setMarker(start, '\u2022')
        var pos = codeViewer.charCoords({line: start, ch: 0}, "local");
        $('#viewerWell').scrollTop(pos.y);
        oldLines = {};
        for(var i = start; i <= end; i ++)
        {
            codeViewer.setLineClass(i, null, 'hilighted-line');
            oldLines[i] = codeViewer.getLine(i);
        }
        
    }
    else if (cmd == 'CHANGE_VAR') // Change the variable as described
    {
        var name = parts[2];
        var value = parts[3];
        var line = parts[4] - 1;
        var col = parts[5] - 1;
        
        var curLine = codeViewer.getLine(line);
        
        if(oldLines[line] == undefined) oldLines[line] = curLine
        var lengthDif = curLine.length - oldLines[line].length;
        
        // +2 is to adjust for how editor keeps track of column values (1 based)
        var newString = curLine.splice(col + 2 + lengthDif + (name.length - 1), 0, "(" + value.replace(/;:;/gi, ' ') + ")");
        codeViewer.setLine(line, newString);
    }
    else if (cmd == 'EXCEPTION')
    {
        exceptionText = true;
    }
}

function outputLine(line)
{
    if(exceptionText)
        jqConsole.Write(line, 'jqconsole-error');
    else
        jqConsole.Write(line);
}

function resultCallback(res) {
    //re-enable running
    running = false;
    
    if(outputBuffer != '') // Still leftover line
    {
        processLine(lastLine);
        outputBuffer = '';
    }
}

function errorCallback(err) {
    jqConsole.Write(err, 'jqconsole-error');
}

var percentageTotal = 0;
var fudgeIt = false;
function progressCallback(percentage) {
    if(percentage == null)
        fudgeIt = true

    if(fudgeIt)
    {
        if(percentageTotal >= 90)
            return;
        
        percentageTotal = percentageTotal + 10;
    }
    else
    {
        percentageTotal = percentage;
    }
    
    $('#loaderProgressBar').css('width', percentageTotal + '%');
}

function timeoutCallback(time){

}

var jsrepl = new JSREPL({  
    input: inputCallback,  
    output: outputCallback,  
    result: resultCallback,  
    error: errorCallback,  
    progress: progressCallback,  
    timeout: {  
        time: 30000,  
        callback: timeoutCallback 
    }  
});

var codeEditor = null;
var codeViewer = null;
var jqConsole = null;
var running = false;
var speed = 5;

function runCode()
{
    if(running)
        return;
        
    for(var i in oldLines)
    {
        var ln = parseInt(i);
        codeViewer.clearMarker(ln)
        codeViewer.setLineClass(ln, null, null);
        codeViewer.setLine(ln, oldLines[i]);
    }
    
    oldLines = {};
        
    exceptionText = false;
    
    jqConsole.Reset();
    jqConsole.Write('Output\n', 'jqconsole-hilighted');
    
    var code = codeEditor.getValue();
    var wrappedCode = pythonWrapper_1 + speed + pythonWrapper_2;
    
    var lines = code.split('\n');

    for(var i = 0; i < lines.length; i ++)
    {
        wrappedCode = wrappedCode + lines[i].replace(/'''/gi, "\\\'\'\'")  + '\n';
    }
    wrappedCode = wrappedCode + pythonWrapper_3;
                
    for(var i = 0; i < lines.length; i ++)
    {
        wrappedCode = wrappedCode +  '    ' + lines[i] + '\n';
    }
    
    wrappedCode = wrappedCode + pythonWrapper_4;
    
    codeViewer.setValue(code);
    jsrepl.eval(wrappedCode);
        
    running = true;
}   
jsrepl.loadLanguage('python', function () {  
    $('#loaderProgressBar').css('width', '100%');
    $('#loadingDialogButton').removeAttr('disabled');
    $('#loaderFinishedLabel').show();
});

$(window).resize( function () {
    $('.main-row').parent().css('height', $(window).height() - $('.navbar').outerHeight(true));

    var container = $('#console').parent();
    
    $('#console').height(container.height());
    $('#console').width(container.width());
    
    
});

$(document).ready( function () {
    $('#loaderFinishedLabel').hide();
    $(window).resize();
    
    codeEditor = CodeMirror( $('#editorWell')[0], {
        mode: "python",
        indentUnit: 4,
        lineNumbers: true,
        matchBrackets: true,
        extraKeys: { "F5" : runCode }
    }
   );
   
    codeViewer = CodeMirror( $('#viewerWell')[0], {
        mode: "python",
        indentUnit: 4,
        lineNumbers: true,
        matchBrackets: true,
        readOnly: true
    }
    );
    
    jqConsole = $('#console').jqconsole('', '>>>');
    jqConsole.Write('Output\n', 'jqconsole-hilighted');

    $('#loadLanguageModal').modal({show: true, backdrop: 'static'});
    
    $('#editorWell').parent().hover(function (evt) {
        $('#runButton').show();
    },
    function (evt) {
        $('#runButton').hide();
    });
    
    $('#runButton').click(function() {
        runCode();
    });
    
    $('#speedButtons').find('.btn').click( function() {
        $('#speedButtons').find('.btn-primary').removeClass('btn-primary');
        $(this).addClass('btn-primary');
        speed = parseInt($(this).text());
    });
    
    $('#exampleLinks').find('span').click( function() {
        var txt = $(this).text();
        
        if(txt == 'Example 1')
            codeEditor.setValue(exampleOne)
        else if(txt == 'Example 2')
            codeEditor.setValue(exampleTwo)
        else if(txt == 'Example 3')
            codeEditor.setValue(exampleThree)
        else if(txt == 'Example 4')
            codeEditor.setValue(exampleFour)
    });
    
});

var exampleOne = 
'foo = 1\n' +
'bar = 2\n' +
'print foo\n' +
'print bar'

var exampleTwo =
'def foo():\n' +
'    x = 1\n' +
'    print x\n' +
'\n' +
'foo()'

var exampleThree =
'def foo(x, y, z):\n' +
'    q = x + y + z\n' +
'    print q\n' +
'\n' +
'foo(1, 2, 3)'

var exampleFour =
'def foo(x):\n' +
'    if x == True:\n' +
'        print \'Foo\'\n' +
'    else:\n' +
'        print \'Bar\'\n' +
'\n' +
'foo(True)'