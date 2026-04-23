import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { AppConfig } from '../utils/AppConfig';
import {
  DEFAULT_THEME,
  parseThemeFromCookieHeader,
  ThemeName,
} from '../themes/themes';

type MyDocumentProps = DocumentInitialProps & { theme: ThemeName };

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const cookieHeader = ctx.req?.headers?.cookie;
    const theme = cookieHeader
      ? parseThemeFromCookieHeader(cookieHeader)
      : DEFAULT_THEME;
    return { ...initialProps, theme };
  }

  render() {
    return (
      <Html lang={AppConfig.locale} data-theme={this.props.theme}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
