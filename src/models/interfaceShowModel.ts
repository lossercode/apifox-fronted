/*
 * @Author: lossercoder
 * @Date: 2023-08-21 15:21:14
 * @LastEditors: lossercode 
 * @LastEditTime: 2023-08-22 22:20:44
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
    const [currentInterfaceId, setCurrentInterfaceId] = useState<string>('')

    // 当前选中的接口名称
    const [directory, setDirectory] = useState<string>('')

    // 文件夹是否需要刷新，当新增接口时点了保存文件夹需要刷新
    const [needFlush, setNeedFlush] = useState<boolean>(false)

    return {
        tabItems,
        setTabItems,
        activeTab,
        setActiveTab,
        currentInterfaceId,
        setCurrentInterfaceId,
        directory,
        setDirectory,
        needFlush,
        setNeedFlush
    }
}