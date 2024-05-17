import { useQuery, gql } from '@apollo/client';
import styles from './DisplayLocations.module.css';

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_LOCATIONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.locations.map(({ id, name, description, photo }) => (
        <div className={styles.container} key={id}>
            <h3>{name}</h3>
            <img className={styles.image} src={`${photo}`} />
            <br />
            <b>About this location:</b>
            <p>{description}</p>
            <br />
        </div>
    ));
}

export default DisplayLocations;
