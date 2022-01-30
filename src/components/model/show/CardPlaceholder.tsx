import ContentLoader from 'react-content-loader';

const ShowCardPlaceholder = () => (
  <ContentLoader
    viewBox="0 0 200 250"
    speed={2}
    backgroundColor="#252332"
    foregroundColor="#292536"
  >
    <rect width="200" height="250" rx="4" />
  </ContentLoader>
);

export default ShowCardPlaceholder;
