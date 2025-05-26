import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { CardHeader, CardTitle , Card , CardContent, CardFooter  } from "./components/ui/card";
import { Heart, MapPin, MapPinIcon , Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import useFetch from "./hooks/use-fetch";
import { deleteJob, saveJob } from "./pages/api/apiJobs";
import toast from "react-hot-toast";
import { GridLoader } from "react-spinners";




const JobCard = ({job,isMyJob = false, savedInit = false, onJobSaved = () => {}, }) => {

  const { user , isLoaded } = useUser();
  // console.log(user) //for print debugging

const [saved , setSaved] = useState(savedInit);
  
const handleSavedJob = async() =>{


  await fnSavedJob({
  
  user_id:user.id,
  job_id:job.id,
  
  });
   
onJobSaved();

  };


  // console.log(isLoaded ? job : 0)


const {fn:fnSavedJob, data:SavedJob, loading: loadingSavedJob } = useFetch(saveJob,{

  alreadySaved: saved,

});


const {loading:loadingDeleteJob , fn:fnDeleteJob } = useFetch(deleteJob,{

job_id:job.id,

})



const handleDeleteJob = async() =>{

await fnDeleteJob();
onJobSaved();
}

useEffect(()=>{

  if(SavedJob!==undefined){
    
  setSaved(SavedJob?.length > 0);

  }
  
  },[SavedJob]);



  return (
    <Card className={'flex flex-col  '}>
      {loadingDeleteJob && (<GridLoader className='mt-4' width='100%' color='#36d7b7' />)}
      <CardHeader>
        <CardTitle className={'flex justify-center sm:justify-between'}>
          {job.title}

          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className={' space-y-5  sm:space-y-0'}>
        <div className="space-y-6">
         <div className="flex justify-center items-center sm:block">
          {job.company && (
            <img src={job.company.logo_url} loading="lazy" className="h-6 " alt={job.company_id} />
          )}
          </div>

          <div className="flex gap-2 justify-center sm:justify-end items-center">
            <MapPinIcon size={15} /> <span>{job.location}</span>
          </div>
        </div>
        <hr />
        <span className="text-[14px] sm:text-base">{job.description}</span>
      </CardContent>

<CardFooter className='flex justify-center flex-col sm:flex-row sm:justify-between gap-8 sm:gap-2'>
  <Link to={`/job/${job.id}`}>
  
  <Button variant='secondary' className='w-[100%]'>More Details</Button>
  
  </Link>



{!isMyJob && <Button role='button' aria-label='save/unsave job' variant='destructive' 
onClick={handleSavedJob} 
disabled={loadingSavedJob}
className='w-15'>

{saved ? (<Heart size={20} stroke='red' fill='red' />)
 : 
 (<Heart size={20}  />) }

  
  </Button>}



</CardFooter>

    </Card>
  );
};

export default JobCard;
