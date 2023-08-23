/*
 * @Author: lossercoder
 * @Date: 2023-08-17 14:24:36
 * @LastEditors: lossercode 
 * @LastEditTime: 2023-08-19 21:51:36
 * @Description: 将body的数据解析成json
 */

import { ResBodyType } from "@/models/interfaceModel";

type ResultType = {
    [key: string]: string | ResultType

}
const parseBodyToJson = (body: ResBodyType[]) => {
    // 使用递归实现，也可以用双指针迭代
    // 格式参考 apifox
    let tempEnd = body.length
    const parse = (body: ResBodyType[], start:number, end:number, result: ResultType): ResultType => {
        if(start >= body.length || end >= tempEnd){
            return result
        }
        const data = body[start]
        if(data.type !== 'object' && data.type !== 'array'){
            result[data.element] = {
                type: data.type,
                properties: {
                    mock: data.mock,
                    name: data.name,
                    des: data.des
                }
            }
            return parse(body, start+1, end+1, result)
            
        } else if(data.type === 'array'){
            const next = body[start + 1]
            result[data.element] = {
                type: 'array',
                items: {
                    type: next.type,
                    properties: {}
                }
            }
            return parse(body, start+2, end+2, result)
    
        } else {
            // 找到结束位置
            let i = start+1
            while(i < body.length){
                if(body[i].indent <= body[start].indent){
                    break
                }else{
                    i++
                }
            }
            tempEnd = i
            const child = parse(body, start+1, end+1, {})
            result[data.element] = {
                type: 'object',
                properties: {
                    ...child
                }
            }
            const len = Object.keys(child).length
            // 回到原来的位置
            tempEnd = body.length
            return parse(body, start+len+1, end+len+1, result)
        }
    }
    const result = parse(body, 0, 0, {})
    return JSON.stringify(result, null, 4)
}


export {
    parseBodyToJson
}
