export const handleSearch = (searchText, allPosts) => {
  const regex = new RegExp(searchText, "i");
  return allPosts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.content)
  );
};