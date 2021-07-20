import Image from 'next/image'
import { Toolbar } from '../components/toolbar';
import styles from '../styles/EOM.module.css';

export const EOM = ({ employee }) => {

  return (
    <div className='page-container'>
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee Of The Month</h1>

        <div className={styles.employeeOfTheMonth}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          {/* <img src={employee.image} /> */}
          <div className={styles.img}>
            <Image src='/employee.jpg' alt="employee picture" width={500} height={500} />
          </div>
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async papgeContext => {
  const apiResponse = await fetch(
    'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth'
  );

  const employee = await apiResponse.json();

  return {
    props: {
      employee: employee
    }
  }
};

export default EOM;