// FILE: src/components/AddMapCustomControl.style.tsx
export default function AddMapCustomControlStyle() {
  return (
    <style>{`
html, body {width:100%;height:100%;margin:0;padding:0;}
.map_wrap {position:relative;overflow:hidden;width:100%;}
.radius_border{border:1px solid #919191;border-radius:5px;}

/* 컨트롤 z-index 크게 (카카오 오버레이 위로) */
.custom_typecontrol {
  position:absolute;top:10px;right:10px;overflow:hidden;width:130px;height:30px;
  margin:0;padding:0;z-index:3000;font-size:12px;font-family:'Malgun Gothic','맑은 고딕',sans-serif;
}
.custom_typecontrol span {display:block;width:65px;height:30px;float:left;text-align:center;line-height:30px;cursor:pointer;}
.custom_typecontrol .btn {background:#fff;background:linear-gradient(#fff,#e6e6e6);}
.custom_typecontrol .btn:hover {background:#f5f5f5;background:linear-gradient(#f5f5f5,#e3e3e3);}
.custom_typecontrol .btn:active {background:#e6e6e6;background:linear-gradient(#e6e6e6,#fff);}
.custom_typecontrol .selected_btn {color:#fff;background:#425470;background:linear-gradient(#425470,#5b6d8a);}
.custom_typecontrol .selected_btn:hover {color:#fff;}

.custom_zoomcontrol {
  position:absolute;top:50px;right:10px;width:36px;height:auto; /* 높이 자동 */
  overflow:hidden;z-index:3000;background-color:#f5f5f5;
}
.custom_zoomcontrol span {display:block;width:36px;height:40px;text-align:center;cursor:pointer;}
.custom_zoomcontrol span:first-child{border-bottom:1px solid #bfbfbf;}
/* inline svg 크기 보장 */
.custom_zoomcontrol span svg {width:15px;height:15px;margin:12px 0;display:inline-block;}
`}</style>
  );
}
