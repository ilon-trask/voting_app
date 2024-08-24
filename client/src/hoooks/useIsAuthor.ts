function useIsAuthor(authorId: string) {
  const userId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userId="))
    ?.split("=")[1];
  console.log(userId);
  return userId == authorId;
}

export default useIsAuthor;
