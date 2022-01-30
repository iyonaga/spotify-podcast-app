import ContentLoader from 'react-content-loader';
import EpisodeListPlaceholder from '../episode/EpisodeListPlaceholder';

const ShowDetailPlaceholder = () => (
  <>
    <ContentLoader
      height="537"
      backgroundColor="#252332"
      foregroundColor="#292536"
      className="w-full"
    >
      <rect width="300" height="300" rx="9" />
      <rect x="336" y="9" width="317" height="29" />
      <rect x="336" y="58" width="387" height="23" />
      <rect x="336" y="104" width="164" height="43" rx="21.5" />
      <rect y="353" width="116" height="29" />
      <rect y="412" width="909" height="20" />
      <rect y="489" width="139" height="29" />
    </ContentLoader>
    <EpisodeListPlaceholder />
  </>
);

export default ShowDetailPlaceholder;
