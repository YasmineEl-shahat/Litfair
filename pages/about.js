
import "bootstrap/dist/css/bootstrap.min.css";

import style from "../styles/pages/About.module.scss";
import Layout from "../comps/layout";

const About =()=>{

    return(
        <>
        <div class="row">
        
<div className="col-md-6">
<div className={style.wrapCont}>


    <h3 className="">About Us</h3>
    <div className={style.content}>
    An automated platform for hiring purposes that makes the process of hiring easier than ever and helps the hiring team to make quick decisions. The platform identifies best-fit candidates and automates workflows with high-quality CV screening, interviewing, and assessment technology.
    </div>


    
    <h3 className="">Looking for a job?</h3>
    <div  className={style.content}>If you are searching for a new career opportunity, you can search open vacancies and jobs.You can also signup here to be alerted of new jobs.
    </div>

    <h3 className="">Are you a recruiter or employer?</h3>
    <div  className={style.content}>If you are currently hiring, and would like to advertise your jobs on LitFair.com, please signup for an employer account and post your jobs right away.
    </div>


    
    <h3 className="">Other inquiries?</h3>
    <div  className={style.content}>If you have any other inquiries, please contact us.
    </div>




    </div>
    </div> 



    <div className="col-md-6 col-sm-12 col-xs-12">
      <div className={style.wrapMap}>
        <a href="https://goo.gl/maps/EaRpj6EqLABaKd1KA" target="_blank">
          <div id="map-tile">
          <iframe className={style.map}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6831.406498604145!2d31.671020549999998!3d31.117978899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9d7ab201c241d%3A0x118e4e2911c210fc!2sMit%20Hadid%2C%20Menyet%20El%20Nasr%2C%20Dakahlia%20Governorate!5e0!3m2!1sen!2seg!4v1657780735540!5m2!1sen!2seg"
       
      
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    
   
  </a>
  </div>
</div>
</div>


        </>
    )
}
About.getLayout = function getLayout(page) {
    return <Layout title="About Us">{page}</Layout>;
  };
export default About;