import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>JWT Mechanism</title>
          <meta name="description" content="JWT Mechanism"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
