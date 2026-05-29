import { XMLParser } from 'fast-xml-parser';

export function XmlToJson(xmlStr : string){
    const parser = new  XMLParser();

    return parser.parse(xmlStr);
}