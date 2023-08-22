/*
 * @Author: lossercoder
 * @Date: 2023-08-21 15:21:14
 * @LastEditors: lossercode 
 * @LastEditTime: 2023-08-21 15:50:33
 * @Description: 接口页面需要用到的共享状态
 */

import { useState } from "react";

export type TabsProps = {
    [key: string]: string | JSX.Element
    key: string;
    label: string;
    children: JSX.Element
}
export default function useInfaModel() {
    // 接口列表组件右侧的tabs标签的内容
    const [tabItems, setTabItems] = useState<TabsProps[]>([])
    // 当前选中的tab
    const [activeTab, setActiveTab] = useState<string>('')

    // 当前选中的接口的id
    const [currentInterface, setCurrentInterface] = useState<string>('')

    return {
        tabItems,
        setTabItems,
        activeTab,
        setActiveTab,
        currentInterface,
        setCurrentInterface
    }
}