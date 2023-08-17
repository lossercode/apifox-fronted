import { DataSourceType } from "@/pages/Projects/components/JoinedProject";
import { useState,useEffect } from "react";


export default function projectModel() {
    const [selectedProject, setSelectedProject] = useState<DataSourceType>(); 
    
    const [selectedInterface,setSelectedInterface] = useState('0');

    
    return { selectedProject, setSelectedProject,selectedInterface,setSelectedInterface };
}