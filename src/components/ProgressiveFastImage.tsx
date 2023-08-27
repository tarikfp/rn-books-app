import * as React from 'react';
import {
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle as FastImageStyle,
  OnLoadEvent,
  Source,
} from 'react-native-fast-image';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export interface IProgressiveFastImageProps {
  loadingImageComponent?: React.ReactNode;
  source: Source;
  blurRadius?: number;
  errorSource?: any;
  loadingSource?: any;
  thumbnailSource?: any;
  resizeMode?: FastImageProps['resizeMode'];
  style?: StyleProp<FastImageStyle>;
  thumbnailImageStyle?: StyleProp<ImageStyle>;
  loadingImageStyle?: StyleProp<FastImageStyle>;
  loadingImageContainerStyle?: StyleProp<ViewStyle>;
  thumbnailAnimationDuration?: number;
  imageAnimationDuration?: number;
  useNativeDriver?: boolean;
  testID?: string;
  onLoad?: (e: OnLoadEvent) => void;
  onThumbnailLoad?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
}

interface IState {
  imageLoaded: boolean;
  error: boolean;
  showDefault: boolean;
}

class ProgressiveImage extends React.Component<
  IProgressiveFastImageProps,
  IState
> {
  animatedImage = new Animated.Value(0);
  animatedThumbnailImage = new Animated.Value(0);
  animatedLoadingImage = new Animated.Value(1);

  constructor(props: IProgressiveFastImageProps) {
    super(props);
    this.state = {
      error: false,
      showDefault: true,
      imageLoaded: false,
    };
  }

  onThumbnailLoad = () => {
    Animated.timing(this.animatedLoadingImage, {
      toValue: 0,
      useNativeDriver: this.props.useNativeDriver || true,
    }).start(() => {
      Animated.timing(this.animatedThumbnailImage, {
        toValue: 1,
        duration: this.props.thumbnailAnimationDuration,
        useNativeDriver: this.props.useNativeDriver || true,
      }).start();
    });
    this.props.onThumbnailLoad?.();
  };

  onImageLoad = (e: OnLoadEvent) => {
    this.setState({ imageLoaded: false });
    Animated.timing(this.animatedImage, {
      toValue: 1,
      duration: this.props.imageAnimationDuration,
      useNativeDriver: this.props.useNativeDriver || true,
    }).start();
    this.props.onLoad?.(e);
  };

  onLoadEnd = () => {
    this.setState({ showDefault: false }, () => {
      this.props.onLoadEnd?.();
    });
  };

  onError = () => {
    this.setState({ error: true }, () => {
      this.props.onError?.();
    });
  };

  // ? bugfix: FastImage library's `source` null
  normalisedSource = () => {
    const { source } = this.props;
    const normalisedSource =
      source && typeof source.uri === 'string' && !source.uri.split('http')[1]
        ? null
        : source;
    return this.props.source && this.props.source.uri
      ? normalisedSource
      : source;
  };

  statedSource = () => {
    const { error } = this.state;
    const { loadingSource, errorSource } = this.props;
    if (!loadingSource) {
      return error ? errorSource : this.normalisedSource();
    }
    if (!errorSource) {
      return this.normalisedSource();
    }
    return error
      ? errorSource // ? Error Image
      : this.normalisedSource();
  };

  render() {
    const {
      style,
      loadingSource,
      thumbnailSource,
      thumbnailImageStyle,
      loadingImageContainerStyle,
      loadingImageComponent,
      blurRadius,
      loadingImageStyle,
      resizeMode,
      testID,
    } = this.props;

    const finalSource = this.statedSource();

    return (
      <View style={[styles.container]}>
        {loadingImageComponent ||
          (loadingSource && !this.state.imageLoaded && (
            <View
              style={[styles.loadingImageStyle, loadingImageContainerStyle]}
            >
              <AnimatedFastImage
                resizeMode="contain"
                style={[
                  { opacity: this.animatedLoadingImage },
                  loadingImageStyle,
                ]}
                source={this.props.loadingSource}
              />
            </View>
          ))}

        {!!thumbnailSource && (
          <Animated.Image
            blurRadius={blurRadius}
            source={thumbnailSource}
            onLoad={this.onThumbnailLoad}
            style={[
              {
                opacity: this.animatedThumbnailImage,
              },
              thumbnailImageStyle,
            ]}
          />
        )}
        <AnimatedFastImage
          testID={testID}
          resizeMode={resizeMode}
          onError={this.onError}
          onLoad={this.onImageLoad}
          onLoadEnd={this.onLoadEnd}
          style={[styles.imageStyle, { opacity: this.animatedImage }, style]}
          source={finalSource}
        />
      </View>
    );
  }
}

export default ProgressiveImage;

interface Style {
  container: ViewStyle;
  imageStyle: FastImageStyle;
  loadingImageStyle: ImageStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: 'transparent',
  },
  imageStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  loadingImageStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
