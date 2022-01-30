import ContentLoader from 'react-content-loader';

const ItemPlaceholder = () => (
  <ContentLoader
    speed={2}
    backgroundColor="#252332"
    foregroundColor="#292536"
    className=" w-full"
  >
    <rect x="15" y="15" width="125" height="125" rx="9" />
    <rect x="160" y="22" width="377" height="17" />
    <rect x="160" y="122" width="196" height="15" />
    <rect x="160" y="53" width="100%" height="15" />
    <rect x="calc(100% - 160px)" y="100" width="160" height="40" rx="20" />
  </ContentLoader>
);

export default ItemPlaceholder;
