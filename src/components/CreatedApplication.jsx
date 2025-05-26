import useFetch from '@/hooks/use-fetch';
import { getApplications } from '@/pages/api/apiApplication';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import ApplicationCard from './ApplicationCard';



const CreatedApplication = () => {

const {user, isLoaded} = useUser();

    const {
        loading:loadingApplications,
        data:applications,
        fn:fnApplications,
        
        } = useFetch(getApplications,{
        
        user_id:user.id,
        
        });


        useEffect(()=>{

            fnApplications();

        },[])


        if(loadingApplications){

            return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />;

        }

  return (
    <>
    <div className='flex  flex-col gap-3'>
{applications?.map((application) => {

return (

  <ApplicationCard key={application.id} application={application} isCandidate />

)

})}
    </div>
    </>
  )
}

export default CreatedApplication;
