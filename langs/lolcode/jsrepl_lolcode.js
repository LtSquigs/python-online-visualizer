(function(){self.JSREPLEngine=function(){function b(a,c,i,b,f,g){var d=this;this.error=b;this.sandbox=f;this.result_handler=function(){var a;a=d.machine.frames[0].variables.IT;return a===d.last_it?i(""):(d.last_it=a,i(a.value===null?"":String(a.value)))};this.context=new this.sandbox.LOLCoffee.CodeGenContext;this.machine=new this.sandbox.LOLCoffee.Machine(this.context,function(){return a(function(a){return d.machine.resume(a)})},function(a){c(a);return d.machine.resume()},function(a){b(a);d.machine.reset();
d.machine.halted=true;return d.machine.instruction_ptr=d.machine.instructions.length},this.result_handler,true);this.last_it=null;g()}b.name="JSREPLEngine";b.prototype.Compile=function(a){return(new this.sandbox.LOLCoffee.Parser((new this.sandbox.LOLCoffee.Tokenizer(a)).tokenize())).parseProgram().codegen(this.context)};b.prototype.Eval=function(a){try{this.Compile(a)}catch(c){this.error(c);return}return this.machine.run()};b.prototype.EvalSync=function(a){this.Compile(a);this.machine.done=function(){};
this.machine.run();this.machine.done=this.result_handler;a=this.machine.frames[0].variables.IT;return a===this.last_it?null:(this.last_it=a,a.value)};b.prototype.GetNextLineIndent=function(a){var c,b,h,f,g;if(/\.\.\.\s*$/.test(a))return 0;try{c=(new this.sandbox.LOLCoffee.Tokenizer(a)).tokenize()}catch(d){return false}try{return(new this.sandbox.LOLCoffee.Parser(c.slice(0))).parseProgram(),false}catch(j){a=[];b=[];for(f=0,g=c.length;f<g;f++)h=c[f],h.type==="endline"?(a.push(b),b=[]):b.push(h);c=function(a,
b){var c,e,d,f;b==null&&(b=false);e=[];for(d=0,f=a.length;d<f;d++)switch(c=a[d],c[0].text){case "HAI":e.push("KTHXBYE");break;case "HOW DUZ I":e.push("IF U SAY SO");break;case "IM IN YR":e.push("IM OUTTA YR");break;case "O RLY?":case "WTF?":e.push("OIC");break;case "YA RLY":case "NO WAI":case "MEBBE":if(b&&e.length===0)e.push("OIC");else if(e[e.length-1]!=="OIC")return-1;break;case "KTHXBYE":case "IF U SAY SO":case "IM OUTTA YR":case "OIC":if(e[e.length-1]===c[0].text)e.pop();else return-1}return e.length};
return c(a)<=0?false:c([a.slice(-1)[0]],true)>0?1:0}};return b}()}).call(this);