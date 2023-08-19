import { DataSourceType } from "@/pages/Projects/components/JoinedProject";
import { useState,useEffect } from "react";


export default function projectModel() {
    const [selectedProject, setSelectedProject] = useState<DataSourceType>(); 
        
    return { selectedProject, setSelectedProject };
}