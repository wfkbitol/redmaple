declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}