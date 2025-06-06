import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/pages/api/apiApplication";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

 

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    
    <>
    <Card>
      {loadingHiringStatus && <BarLoader width={`100%`} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className={"flex justify-between font-bold"}>
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}

          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          ></Download>
        </CardTitle>
      </CardHeader>

      <CardContent className={`flex text-xs sm:text-base flex-col gap-4 flex-1`}>
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between">
          <div className="flex gap-2 flex-row md:flex-col lg:flex-row items-center">
            <BriefcaseBusiness size={15} />
            <strong>Experience:</strong>&nbsp;{application?.experience}
            &nbsp;Years of experience
          </div>

          <div className="flex gap-2 flex-row md:flex-col lg:flex-row  items-center">
            <School size={15} />
            <strong>Education:</strong>&nbsp;{application?.education}
          </div>

          <div className="flex gap-2 flex-row md:flex-col lg:flex-row  items-center">
            <Boxes size={15} />
            <strong>Skills:</strong>
            {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>

      <CardFooter className={`flex flex-row justify-between`}>
        <span className="">
          {new Date(application?.created_at).toLocaleString()}


        </span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status:&nbsp;{application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
    </>
  );
};

export default ApplicationCard;
