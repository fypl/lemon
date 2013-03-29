var f=function(){
	var _=NEJ.P,
		_e=_('nej.e'),
		_v=_('nej.v'),
		_j=_('nej.j');

	var page={
		_$init:function(){
			this.__initNode();
			this.__initEvent();
			this.__initNav();
		},
		__initNode:function(){
			this.nav=nes.one('.m-nav');
			this.cnt=nes.one('.m-cnt');
		},
		__initEvent:function(){
			_v._$addEvent(this.nav, 'click', this.__linkClick._$bind(this));
		},
		__initNav:function(){
			_j._$request('/res/cls/class.html',{
				method:'get',
				type:'text',
				onload:function(data){
					this.nav.innerHTML=data;
				}._$bind(this),
				onerror:function(){
					this.nav.innerHTML='something happened in loading nav!';
				}._$bind(this),
			});
		},
		__linkClick:function(evt){
			evt = evt || window.evt;
			var target = evt.srcElement || evt.target;
			if(!nes.matches(target,'a')) return;
			_j._$request('/res/cls/'+target.href.substring(target.href.indexOf('#')+1),{
				method:'get',
				type:'text',
				onload:function(data){
					this.cnt.innerHTML=data;
					this.__highlight();
				}._$bind(this),
				onerror:function(){
					this.cnt.innerHTML='something happened in loading cnt!';
				}._$bind(this)
			});
			_v._$stop(evt);
		},
		__highlight:function(){
			var pres=nes.all('pre', this.cnt);
			for(var i=0,ii=pres.length;i<ii;i++)_e._$addClassName(pres[i], 'prettyprint');
			prettyPrint();
		}
	};
	page._$init();
};
define(['{lib}base/event.js','{lib}util/query/nes.js','{lib}util/ajax/xdr.js'],f);