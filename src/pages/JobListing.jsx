import React, { useEffect, useState } from 'react'
import { getJobs } from './api/apiJobs'
import {  useUser } from '@clerk/clerk-react'
import useFetch from '@/hooks/use-fetch'
import { BarLoader, SyncLoader , RiseLoader } from 'react-spinners'
import JobCard from '@/JobCard'
import { getCompanies } from './api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select , SelectTrigger , SelectValue ,
  SelectContent,SelectGroup,SelectLabel,SelectItem } from '@/components/ui/select'
import { City, Country, State } from 'country-state-city'
import { colors } from '@clerk/themes/dist/clerk-js/src/ui/foundations/colors'
import ChatBot from '@/components/ChatBot'
import { useNavigate } from 'react-router-dom'



const JobListing = () => {


const [searchQuery , setSearchQuery] = useState('');
const [location,setLocation] = useState('');
const [company_id , setCompany_id] = useState('');

const navigate = useNavigate();

  const {isLoaded , user} = useUser();

  // console.log(user) //For print debugging


  const handleSearch = (e) =>{

    e.preventDefault();

    let formData = new FormData(e.target);
    const query = formData.get('search-query');

    if(query)
      setSearchQuery(query);

  }


//New Code


/*Here , we are passing (getJobs,{ location, company_id, searchQuery }) to the useFetch custom hook and we are destructuring fn,data,loading 
from its return value*/
const {fn:fnJobs, data:dataJobs, loading:loadingJobs, } = useFetch(getJobs,{ location, company_id, searchQuery });

//loadingJobs default value = null; dataJobs default value = 0;
/*When you call fnJobs() in your useEffect, the first thing it does is setLoading(true). That updates the loading value 
inside the hook, which you’ve aliased as loadingJobs. React then re‑renders your component 
with loadingJobs === true, so your <RiseLoader/> spinner shows until the fetch resolves (and setLoading(false) runs).  */

// console.log(loadingJobs); //for print debugging

useEffect(()=>{

  // console.log('Fetching jobs....') //for print debugging inside the useeffect

  if(isLoaded){
  fnJobs();
  }

},[isLoaded,location,company_id,searchQuery]);






const {fn:fnCompanies , data:companies ,  } = useFetch(getCompanies,{ location, company_id, searchQuery });


useEffect(()=>{

  // console.log('Fetching companies....') //for print debuggging inside the useeffect

  if(isLoaded){
  fnCompanies();
  }

},[isLoaded]);

const handleClearFilter = () =>{

  setSearchQuery('');
  setLocation('');
  setCompany_id('')

}



if(!isLoaded){

  return <SyncLoader className='mb-4 text-center' width={'100%'} color='#36d7b7' />

}





  return (
    <div className="select-none">
    <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
Latest Jobs
    </h1>


{/* Chatbot */}

{/* <ChatBot /> */}

<Button onClick={()=>navigate('/chatbot')}>Get Career Advise From our AI Career Adviser</Button>

{/* Add Filters Here */}

<form onSubmit={(event) => handleSearch(event)} className='h-14 flex w-full gap-2 items-center mb-3'>


<Input type='text'
placeholder='Search Job By Title...'
name='search-query' 
className='h-full flex-1 px-4 text-base sm:text-md placeholder:text-xs placeholder:sm:text-base'
/>

<Button type='submit' className='h-full sm:w-28 text-white' style={{backgroundColor:'#007694'}}>
Search
</Button>

</form>


<div className="flex  flex-col sm:flex-row gap-14">





{/* Filter by company */}



<Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter By Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
      
{

companies?.map(({name,id})=>{

return (

  // <SelectItem key={id} value={name}>{name}</SelectItem>
  <SelectItem key={id} value={id}>{name}</SelectItem>

)

})

}


        </SelectGroup>
      </SelectContent>
    </Select>
  



<Button variant={'destructive'} onClick={handleClearFilter} className={''}>Clear Filters</Button>

  
</div>



{loadingJobs && <SyncLoader className='mb-4 text-center' width={'100%'} color='#36d7b7' />}




{loadingJobs === false && (


<div className="mt-8 grid grid-cols-1 md:gird-cols-2 lg:grid-cols-3 gap-4">{
dataJobs?.length > 0 ? dataJobs.map((job,index)=>{

return (

<JobCard job={job} key={index}
savedInit={job?.saved?.length>0} />
)

})

 : (

  <span className="">No Jobs Found</span>

)}
</div>)}



    </div>
  )

}

export default JobListing;
