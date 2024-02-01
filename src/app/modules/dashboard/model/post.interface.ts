export interface Postdetails{
    id:number;
    title:string;
    content: [Content];
    author:string;
    createdate:Date;
}

export interface Content {
    id: number;
    paragraph: string;
}