(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b08b99c2"],{"0bc6":function(t,e,n){},"1f4f":function(t,e,n){"use strict";n("a9e3");var i=n("5530"),s=(n("8b37"),n("80d2")),r=n("7560"),a=n("58df");e["a"]=Object(a["a"])(r["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(i["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(s["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"4bd4":function(t,e,n){"use strict";n("4de4"),n("7db0"),n("4160"),n("caad"),n("07ac"),n("2532"),n("159b");var i=n("5530"),s=n("58df"),r=n("7e2b"),a=n("3206");e["a"]=Object(s["a"])(r["a"],Object(a["b"])("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,n=function(t){return t.$watch("hasError",(function(n){e.$set(e.errorBag,t._uid,n)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(s){s&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=n(t)))})):i.valid=n(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var n=this.watchers.find((function(t){return t._uid===e._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"7e58":function(t,e,n){},"7ee1":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("IntegratedCodePicker")],1)},s=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",[n("v-col",{attrs:{cols:"6"}},[n("v-card",[n("v-subheader",[t._v("Zoeken")]),n("v-card-text",[n("v-form",[n("v-text-field",{attrs:{label:"Zoekterm"},model:{value:t.searchterm,callback:function(e){t.searchterm=e},expression:"searchterm"}}),n("v-btn",{attrs:{color:"success"},on:{click:function(e){return t.search(t.searchterm)}}},[t._v(" Zoek ")])],1)],1)],1)],1),n("v-col",{attrs:{cols:"6"}},[n("v-card",[n("v-subheader",[t._v("Filters")]),n("v-card-text",[n("v-simple-table",[n("thead",[n("tr",[n("td",{attrs:{colspan:"2"}},[t._v("Filter: Toon alleen DT (gekoppelde) items of items met afstammelingen met DT koppeling.")])])]),n("tbody",[n("tr",[n("td",[t._v("Zoekresultaten ("+t._s(t.hide_no_dt.searchResults)+")")]),n("td",[n("v-btn-toggle",[n("v-btn",{attrs:{color:"green"},on:{click:function(e){return t.setResultsFilter(!0)}}},[t._v("Filter aan")]),n("v-btn",{attrs:{color:"red"},on:{click:function(e){return t.setResultsFilter(!1)}}},[t._v("Toon alles")])],1)],1)]),n("tr",[n("td",[t._v("Parents ("+t._s(t.hide_no_dt.parents)+")")]),n("td",[n("v-btn-toggle",[n("v-btn",{attrs:{color:"green"},on:{click:function(e){return t.setParentsFilter(!0)}}},[t._v("Filter aan")]),n("v-btn",{attrs:{color:"red"},on:{click:function(e){return t.setParentsFilter(!1)}}},[t._v("Toon alles")])],1)],1)]),n("tr",[n("td",[t._v("Children ("+t._s(t.hide_no_dt.children)+")")]),n("td",[n("v-btn-toggle",[n("v-btn",{attrs:{color:"green"},on:{click:function(e){return t.setChildrenFilter(!0)}}},[t._v("Filter aan")]),n("v-btn",{attrs:{color:"red"},on:{click:function(e){return t.setChildrenFilter(!1)}}},[t._v("Toon alles")])],1)],1)])])])],1)],1)],1)],1),n("v-row",[n("v-col",{attrs:{cols:"5"}},[n("v-card",{staticClass:"ma-1",attrs:{loading:t.loading.searchResultsFiltered}},[n("v-toolbar",{attrs:{color:"indigo",dark:""}},[n("v-toolbar-title",[t._v("Zoekresultaten: searchResultsFiltered na filteren - ("+t._s(t.searchResults.results_returned)+" opgehaald / "+t._s(t.searchResults.results_total)+" gevonden)")])],1),n("v-card-text",[t.loading.searchResults?n("v-list",[n("p",[t._v("Loading")])]):n("v-list",{attrs:{dense:""}},t._l(t.searchResultsFiltered,(function(e){return n("v-list-item",{key:e.id,attrs:{link:""},on:{click:function(n){return t.fetchConcept(e.id)}}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-arrow-right-bold")])],1),n("v-list-item-content",[n("v-list-item-title",[e.equivalent?n("v-icon",{attrs:{small:""}},[t._v("mdi-link-variant")]):t._e(),t._v(t._s(e.title))],1),n("v-list-item-subtitle",[t._v(t._s(e.codesystem)),e.dt_in_descendants&&0==t.hide_no_dt?n("span",[t._v(" - Heeft DT koppeling, of kinderen met koppeling")]):t._e()])],1)],1)})),1)],1)],1)],1),n("v-col",{attrs:{cols:"7"}},[t.parentsFiltered.length>0||0!=t.loading.parents?n("v-card",{staticClass:"ma-1",attrs:{loading:t.loading.parents}},[n("v-toolbar",{attrs:{color:"indigo",dark:""}},[n("v-toolbar-title",[t._v("Parents (parentsFiltered na filteren /parents zonder filter)")])],1),n("v-card-text",[t.loading.parents?n("v-list",[n("p",[t._v("Laden.....")])]):0==t.parentsFiltered.length&&0==t.loading.parents?n("v-list",[t._v(" Geen parents gevonden. ")]):n("v-list",{attrs:{dense:""}},t._l(t.parentsFiltered,(function(e){return n("v-list-item",{key:e.id,attrs:{link:""},on:{click:function(n){return t.fetchConcept(e.id)}}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-file-link")])],1),n("v-list-item-content",[n("v-list-item-title",{attrs:{"text-color":"secondary"}},[e.equivalent?n("v-icon",{attrs:{small:""}},[t._v("mdi-link-variant")]):t._e(),t._v(t._s(e.title))],1),n("v-list-item-subtitle",[t._v(t._s(e.codesystem)+" (children: "+t._s(e.children)+" / DT in children: "+t._s(e.dt_in_descendants)+")")])],1)],1)})),1)],1)],1):t._e(),t.currentConcept||0!=t.loading.concept?n("v-card",{staticClass:"ma-1",attrs:{loading:t.loading.concept}},[n("v-toolbar",{attrs:{color:"indigo",dark:""}},[n("v-toolbar-title",[t._v("Component")])],1),n("v-card-text",[t.loading.concept?n("v-list",[n("p",[t._v("Laden.....")])]):n("v-list",[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[n("b",[t._v("Codesysteem")])]),n("v-list-item-subtitle",[t._v(t._s(t.currentConcept.codesystem))])],1)],1),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[n("b",[t._v("Code")])]),n("v-list-item-subtitle",[t._v(t._s(t.currentConcept.code))])],1)],1),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[n("b",[t._v("Titel")])]),n("v-list-item-subtitle",[t._v(t._s(t.currentConcept.title))])],1)],1),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[n("b",[t._v("Actief")])]),t.currentConcept.extra.Actief?n("v-list-item-subtitle",[t._v("Concept actief")]):t._e(),t.currentConcept.extra.Actief?t._e():n("v-list-item-subtitle",{staticClass:"red"},[t._v("Concept niet actief")])],1)],1),0!=t.currentConcept.equivalent?n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[n("b",[t._v("Mapping")])]),n("v-list-item-subtitle",[n("v-list",t._l(t.currentConcept.equivalent,(function(e){return n("v-list-item",{key:e.id,attrs:{link:""},on:{click:function(n){return t.fetchConcept(e.id)}}},[n("p",[n("v-icon",[t._v("mdi-file-link")])],1),n("v-list-item-content",[n("v-list-item-title",{attrs:{"text-color":"secondary"}},[e.equivalent?n("v-icon",{attrs:{small:""}},[t._v("mdi-link-variant")]):t._e(),t._v(t._s(e.title))],1),n("v-list-item-subtitle",[t._v(" "+t._s(e.codesystem)+" ")]),"Diagnosethesaurus"==e.codesystem?n("v-btn",{attrs:{color:"green"}},[t._v("Vastleggen")]):t._e()],1)],1)})),1)],1)],1)],1):t._e(),0==t.currentConcept.equivalent&&"Snomed"!=t.currentConcept.codesystem?n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[n("b",[t._v("Mapping")])]),t._v(" Aangezien dit concept geen SNOMED concept is en er geen mapping naar SNOMED beschikbaar is, kan er ook geen hiërarchie getoond worden. ")],1)],1):t._e(),"Diagnosethesaurus"==t.currentConcept.codesystem?n("v-list-item",[n("v-list-item-content",[n("v-btn",{attrs:{color:"green"}},[t._v("Vastleggen")])],1)],1):t._e(),0==t.currentConcept.equivalent&&"Snomed"==t.currentConcept.codesystem?n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[n("b",[t._v("Aanvragen")])]),t._v(" Dit SNOMED concept heeft geen koppeling met de Diagnosethesaurus, en kan dus niet geregistreerd worden."),n("br"),n("v-btn",{attrs:{color:"primary"}},[t._v("aanvragen")])],1)],1):t._e()],1)],1)],1):t._e(),t.childrenFiltered.length>0||0!=t.loading.children?n("v-card",{staticClass:"ma-1",attrs:{loading:t.loading.children}},[n("v-toolbar",{attrs:{color:"indigo",dark:""}},[n("v-toolbar-title",[t._v("Children (childrenFiltered na filteren /children zonder filter)")])],1),n("v-card-text",[t.loading.children?n("v-list",[n("p",[t._v("Laden.....")])]):0==t.childrenFiltered.length&&0==t.loading.children?n("v-list",[t._v(" Geen children gevonden. ")]):n("v-list",{attrs:{dense:""}},t._l(t.childrenFiltered,(function(e){return n("v-list-item",{key:e.id,attrs:{link:""},on:{click:function(n){return t.fetchConcept(e.id)}}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-file-link")])],1),n("v-list-item-content",[n("v-list-item-title",{attrs:{"text-color":"secondary"}},[e.equivalent?n("v-icon",{attrs:{small:""}},[t._v("mdi-link-variant")]):t._e(),t._v(t._s(e.title))],1),n("v-list-item-subtitle",[t._v(t._s(e.codesystem)+" (children: "+t._s(e.children)+" / DT in children "+t._s(e.dt_in_descendants)+")")])],1)],1)})),1)],1)],1):t._e()],1)],1)],1)},a=[],o=(n("4de4"),{data:function(){return{searchterm:"",hide_no_dt:{searchResults:!1,parents:!0,children:!0}}},methods:{search:function(t){this.$store.dispatch("IntegratedCodePicker/search",t)},fetchConcept:function(t){this.$store.dispatch("IntegratedCodePicker/getConcept",t),this.$store.dispatch("IntegratedCodePicker/getParents",t),this.$store.dispatch("IntegratedCodePicker/getChildren",t)},setResultsFilter:function(t){this.hide_no_dt.searchResults=t},setParentsFilter:function(t){this.hide_no_dt.parents=t},setChildrenFilter:function(t){this.hide_no_dt.children=t}},computed:{loading:function(){return this.$store.state.IntegratedCodePicker.loading},searchResults:function(){return this.$store.state.IntegratedCodePicker.searchResults},searchResultsFiltered:function(){return this.searchResults.results.length>0&&1==this.hide_no_dt.searchResults?this.searchResults.results.filter((function(t){return 1==t.dt_in_descendants})):this.searchResults.results},currentConcept:function(){return this.$store.state.IntegratedCodePicker.currentConcept},children:function(){return this.$store.state.IntegratedCodePicker.children},childrenFiltered:function(){return 1==this.hide_no_dt.children?this.children.filter((function(t){return 1==t.dt_in_descendants})):this.children},parents:function(){return this.$store.state.IntegratedCodePicker.parents},parentsFiltered:function(){return 1==this.hide_no_dt.parents?this.parents.filter((function(t){return 1==t.dt_in_descendants})):this.parents}}}),l=o,c=n("2877"),d=n("6544"),u=n.n(d),v=n("8336"),h=n("5530"),_=(n("7e58"),n("604c")),m=_["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return _["a"].options.computed.classes.call(this)}},methods:{genData:_["a"].options.methods.genData}}),p=n("a9ad"),g=n("58df"),f=Object(g["a"])(m,p["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return Object(h["a"])({},m.options.computed.classes.call(this),{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var t=this.setTextColor(this.color,Object(h["a"])({},m.options.methods.genData.call(this)));return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),b=n("b0af"),k=n("99d9"),C=n("62ad"),F=n("4bd4"),V=n("132d"),x=n("8860"),$=n("da13"),w=n("1800"),y=n("5d23"),B=n("0fd9"),T=n("1f4f"),R=n("e0c7"),I=n("8654"),O=n("71d9"),P=n("2a7f"),D=Object(c["a"])(l,r,a,!1,null,null,null),j=D.exports;u()(D,{VBtn:v["a"],VBtnToggle:f,VCard:b["a"],VCardText:k["b"],VCol:C["a"],VForm:F["a"],VIcon:V["a"],VList:x["a"],VListItem:$["a"],VListItemAction:w["a"],VListItemContent:y["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"],VRow:B["a"],VSimpleTable:T["a"],VSubheader:R["a"],VTextField:I["a"],VToolbar:O["a"],VToolbarTitle:P["a"]});var E={components:{IntegratedCodePicker:j}},L=E,S=Object(c["a"])(L,i,s,!1,null,null,null);e["default"]=S.exports},"8b37":function(t,e,n){},e0c7:function(t,e,n){"use strict";var i=n("5530"),s=(n("0bc6"),n("7560")),r=n("58df");e["a"]=Object(r["a"])(s["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(i["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})}}]);
//# sourceMappingURL=chunk-b08b99c2.59d80c9b.js.map