export interface IWord {
    name: string;
    description: string;
    synonyms: ISynonym[]
  }
  
  export interface ISynonym {
    name: string;
  }