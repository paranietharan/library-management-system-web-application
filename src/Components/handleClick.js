const appendCurrentPath = (link) => {
  const currentPath = window.location.origin;
  return `${currentPath}/${link}`;
};

const handleClick = (event) => {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
  // Redirect to /article-home route
  const articleHomeUrl = appendCurrentPath('article-home');
  window.location.href = articleHomeUrl;
};

export default handleClick;