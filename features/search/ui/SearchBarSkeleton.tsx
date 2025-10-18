import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const SearchBarSkeleton = () => {
  return (
    <>
      <SkeletonText noOfLines={1} marginBottom={3} width={130} />
      <Box display={"flex"} gap={4}>
        <Skeleton width={"calc(100% - 56px)"} height={10} />
        <Skeleton boxSize="10" />
      </Box>
    </>
  );
};
