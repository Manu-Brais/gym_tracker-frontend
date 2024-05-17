import { useQuery, useMutation, gql } from '@apollo/client';


const GENERATE_REFERRAL_TOKEN = gql`
  mutation generateReferralToken {
    generateReferalToken(input: {}) {
      referalToken
    }
  }
`;

function DisplayReferralTokens() {
    const [generateReferalToken, { data, loading, error }] = useMutation(GENERATE_REFERRAL_TOKEN);

    const handleGenerateToken = async () => {
        try {
            const result = await generateReferalToken();
            console.log('Referral Token:', result.data.generateReferalToken.referalToken);
        } catch (e) {
            console.error('Error generating referral token:', e);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <button onClick={handleGenerateToken}>Generate Referral Token</button>
            {data && <p>Referral Token: {data.generateReferalToken.referalToken}</p>}
        </div>
    );
}

export default DisplayReferralTokens;
