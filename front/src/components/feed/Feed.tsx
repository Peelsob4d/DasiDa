import { useState } from 'react';
import styled from 'styled-components';

interface feedProps {
  images?: string[];
  isClass?: boolean;
  author?: string;
}

function Feed({ images, isClass, author }: feedProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const IMAGE_LAST_INDEX = images!.length - 1;
  const IMAGE_FIRST_INDEX = 0;

  const handleViewerClick = (isNext: boolean): void => {
    if (isNext)
      imageIndex !== IMAGE_LAST_INDEX && setImageIndex(imageIndex + 1);
    else imageIndex !== IMAGE_FIRST_INDEX && setImageIndex(imageIndex - 1);
  };

  return (
    <FeedContainer>
      <Album>
        <ImageList albumPage={imageIndex}>
          {images!.map((imageUrl: string) => (
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={imageUrl}
              alt={imageUrl}
            />
          ))}
        </ImageList>
        <AlbumSlideContainer>
          <AlbumSlideButton onClick={() => handleViewerClick(false)}>
            {'<'}
          </AlbumSlideButton>
          <AlbumSlideButton onClick={() => handleViewerClick(true)}>
            {'>'}
          </AlbumSlideButton>
        </AlbumSlideContainer>
      </Album>
      <MenuContainer>
        <Likes>
          <LikesIcon />
          <LikesCount>{100}</LikesCount>
        </Likes>
        {IMAGE_LAST_INDEX !== IMAGE_FIRST_INDEX && (
          <AlbumNavigator>
            {images!.map((value, index) => (
              <Navigator observeIndex={index} currentIndex={imageIndex} />
            ))}
          </AlbumNavigator>
        )}
        <SocialAlbumSlideContainer>
          <SocialButton />
          <SocialButton />
        </SocialAlbumSlideContainer>
      </MenuContainer>
      <ProfileContainer></ProfileContainer>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 400px;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
`;

const Album = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
`;

const ImageList = styled.div<{ albumPage: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${(props) => `translateX(-${props.albumPage * 100}%)`};
`;

const AlbumSlideContainer = styled.div`
  width: calc(100% - 26px);
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px 0 13px;
`;

const AlbumSlideButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: rgba(52, 52, 52, 0.15);
  color: rgba(255, 255, 255, 0.8);
  border: 0px;
  border-radius: 24px;
  font-size: 16px;
`;

const MenuContainer = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e7e1d2;
  display: flex;
  align-items: center;
`;

const AlbumNavigator = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  & > div {
    margin-right: 2px;
  }
`;

const Navigator = styled.div<{
  observeIndex: number;
  currentIndex: number;
}>`
  border-radius: 6px;
  width: 6px;
  height: 6px;
  background-color: ${(props) =>
    props.observeIndex === props.currentIndex
      ? '#E0D4B7'
      : 'rgba(231, 225, 210, 0.5)'};
  &:last-child {
    margin-right: 0px;
  }
`;

const Likes = styled.div`
  margin-left: 21px;
  height: 22px;
  display: flex;
  align-items: center;
`;

const LikesIcon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

const LikesCount = styled.div`
  margin-left: 8px;
  color: #000000;
  height: 19px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const SocialAlbumSlideContainer = styled.div`
  margin-right: 17px;
  height: 22px;
  display: flex;
  justify-content: space-between;
`;

const SocialButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 2px solid black;
  &:first-child {
    margin-right: 12px;
  }
`;

const ProfileContainer = styled.div`
  height: 60px;
  display: flex;
`;

export default Feed;