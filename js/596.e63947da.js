"use strict";(self["webpackChunkipfscan"]=self["webpackChunkipfscan"]||[]).push([[596],{4318:function(){},2596:function(t,e,a){a.r(e),a.d(e,{default:function(){return T}});var o=a(6023),n=(a(5331),a(8736),a(213),a(5970),a(7009)),i=(a(8450),a(8785),a(4880)),l=(a(7128),a(1450)),d=a(6768),s=a(4232);const r={class:"container"},c={class:"header-content"},h={class:"header-action"},u={class:"main-container"},m={style:{margin:"8px"}},p=["src"];function f(t,e,a,f,b,k){const g=(0,d.g2)("font-awesome-icon"),w=l.R7,T=i.bZ,y=o.o8,F=n.Zq,v=o.Up;return(0,d.uX)(),(0,d.CE)("div",r,[(0,d.bF)(T,null,{default:(0,d.k6)((()=>[(0,d.Lk)("div",c,[e[0]||(e[0]=(0,d.Lk)("span",{class:"title"},"用户管理",-1)),(0,d.Lk)("div",h,[(0,d.bF)(w,{disabled:k.disableTooltip,content:"返回主管理页",placement:"bottom"},{default:(0,d.k6)((()=>[(0,d.bF)(g,{icon:"home",class:"header-icon",onClick:k.handleGoHome},null,8,["onClick"])])),_:1},8,["disabled"]),(0,d.bF)(w,{disabled:k.disableTooltip,content:"返回上传页",placement:"bottom"},{default:(0,d.k6)((()=>[(0,d.bF)(g,{icon:"upload",class:"header-icon",onClick:k.handleGoUpload},null,8,["onClick"])])),_:1},8,["disabled"]),(0,d.bF)(w,{disabled:k.disableTooltip,content:"退出登录",placement:"bottom"},{default:(0,d.k6)((()=>[(0,d.bF)(g,{icon:"sign-out-alt",class:"header-icon",onClick:k.handleLogout},null,8,["onClick"])])),_:1},8,["disabled"])])])])),_:1}),(0,d.Lk)("div",u,[(0,d.bF)(v,{data:b.dealedData,"default-sort":{prop:"count",order:"descending"},class:"main-table","table-layout":"fixed"},{default:(0,d.k6)((()=>[(0,d.bF)(y,{type:"expand"},{default:(0,d.k6)((t=>[(0,d.Lk)("div",m,[e[1]||(e[1]=(0,d.Lk)("h3",{style:{"text-align":"center"}},"上传文件列表",-1)),(0,d.bF)(v,{data:t.row.data,style:{width:"100%"},"default-sort":{prop:"metadata.TimeStamp",order:"descending"},"table-layout":"fixed"},{default:(0,d.k6)((()=>[(0,d.bF)(y,{prop:"metadata.FileName",label:"文件名"}),(0,d.bF)(y,{prop:"name",label:"文件预览"},{default:(0,d.k6)((({row:t})=>[t.metadata?.FileType?.includes("image")?((0,d.uX)(),(0,d.Wv)(F,{key:0,src:"/file/"+t.name,fit:"cover",lazy:"",style:{width:"100px",height:"100px"}},null,8,["src"])):((0,d.uX)(),(0,d.CE)("video",{key:1,src:"/file/"+t.name,controls:"",style:{width:"100px",height:"100px"}},null,8,p))])),_:1}),(0,d.bF)(y,{formatter:k.formatTimeStamp,label:"上传时间",prop:"metadata.TimeStamp",sortable:"","sort-method":k.sortByTimestamp},{default:(0,d.k6)((({row:t})=>[(0,d.eW)((0,s.v_)(k.formatTimeStamp(t.metadata.TimeStamp)),1)])),_:1},8,["formatter","sort-method"])])),_:2},1032,["data"])])])),_:1}),(0,d.bF)(y,{prop:"ip",label:"IP地址"}),(0,d.bF)(y,{prop:"count",label:"上传次数",sortable:""})])),_:1},8,["data"])])])}a(4114),a(7642),a(8004),a(3853),a(5876),a(2475),a(5024),a(1698);var b=a(782),k={name:"CustomerConfig",data(){return{tableData:[],dealedData:[]}},computed:{...(0,b.L8)(["credentials"]),disableTooltip(){return window.innerWidth<768}},methods:{async fetchWithAuth(t,e={}){this.credentials&&(e.headers={...e.headers,Authorization:`Basic ${this.credentials}`},e.credentials="include");const a=await fetch(t,e);if(401===a.status)throw this.$message.error("认证状态错误，请重新登录"),this.$router.push("/adminLogin"),new Error("Unauthorized");return a},dealByIP(t){let e=[],a=new Set;return t.forEach((t=>{t.metadata?.UploadIP&&a.add(t.metadata.UploadIP)})),a.forEach((a=>{let o=t.filter((t=>t.metadata?.UploadIP===a)),n=o.length;e.push({ip:a,count:n,data:o})})),e},handleGoUpload(){this.$router.push("/")},handleLogout(){this.$store.commit("setCredentials",null),this.$router.push("/adminLogin")},handleGoHome(){this.$router.push("/dashboard")},formatTimeStamp(t){return new Date(t).toLocaleString()},sortByTimestamp(t,e){return new Date(t.metadata.TimeStamp)-new Date(e.metadata.TimeStamp)}},mounted(){this.fetchWithAuth("/api/manage/check",{method:"GET"}).then((t=>t.text())).then((t=>{if("true"==t)return this.showLogoutButton=!0,this.fetchWithAuth("/api/manage/list",{method:"GET"});if("Not using basic auth."==t)return this.fetchWithAuth("/api/manage/list",{method:"GET"});throw new Error("Unauthorized")})).then((t=>t.json())).then((t=>{this.tableData=t,this.dealedData=this.dealByIP(t)})).catch((t=>{"Unauthorized"!==t.message&&this.$message.error("同步数据时出错，请检查网络连接")}))}},g=a(1241);const w=(0,g.A)(k,[["render",f],["__scopeId","data-v-0187bf42"]]);var T=w},8736:function(t,e,a){a(5331)},7128:function(t,e,a){a(5331),a(4318)},8450:function(t,e,a){a(5331)},9104:function(t,e,a){a(5331)},5970:function(t,e,a){a(5331)},8785:function(t,e,a){a(5331)},213:function(t,e,a){a(5331),a(9104)}}]);
//# sourceMappingURL=596.e63947da.js.map