import style from "../styles/pages/empty.module.scss";


const Empty =({txt1,txt2,btn})=>{

return(
    <div className={style.wrap}>

    <img
      className={style.emptyVector}
    
      src="/assets/profile/blank-profile-picture.png"
    />
    
   {txt1}
   {txt2}
   {btn}
    


</div>
)
   
    }
      export default Empty;