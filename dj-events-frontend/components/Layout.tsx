import {NextRouter, useRouter} from 'next/router'
import Head from 'next/head'
import styles from '@/styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase'

interface LayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout = ({
  title,
  keywords,
  description,
  children,
}:LayoutProps) => {

  const router: NextRouter = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ in other musical events',
  keywords: 'music, dj, edm, events',
};

export default Layout;