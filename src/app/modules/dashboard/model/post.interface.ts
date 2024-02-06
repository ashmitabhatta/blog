

export interface Postdetails {
    id: number;
    title: string;
    content: Content[];
    author: string;
    createdate: Date;
}

export interface Content {
    id: number;
    paragraph: string;
}
export interface Setting{
    id:number;
    // username:string;
    headerColor:string;
    buttonColor:string;
    usernameColor:string;
    usernameFontsize:string;
    headerFont:string
}
export interface Style{
    header: {
        'background-color': string,
        'font-family': string,
      },
      button: {
        'color': string,
      },
      username: {
        'color': string,
        'font-size': string
      }
}

  