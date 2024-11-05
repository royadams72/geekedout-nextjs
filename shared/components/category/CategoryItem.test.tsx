import React from "react";
import { render, screen } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  comicSliceMock,
  comicsPreviewArray,
} from "@/__mocks__/comics/comics.mocks";
import CategoryItem from "@/shared/components/category/CategoryItem";
import { selectIsFirstPage } from "@/lib/features/uiData/uiDataSlice";

// Mock the Redux hooks
jest.mock("@/lib/hooks/store.hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("next/link", () => {
  const mockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  return mockLink;
});

jest.mock("next/image", () => {
  const mockImage = ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) => <img src={src} alt={alt} className={className} />;
  return mockImage;
});

const comicsReducer = () => comicSliceMock;
const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      comics: comicsReducer,
    }),
  });
};

describe("CategoryItem Component", () => {
  let store: any;
  let mockUseAppSelector: jest.Mock;

  beforeEach(() => {
    store = makeStore();
    mockUseAppSelector = require("@/lib/hooks/store.hooks").useAppSelector;
    jest.clearAllMocks();
  });

  it("should render an image with the correct alt text", () => {
    const item = comicsPreviewArray[0];
    const altText = item.title;

    render(
      <Provider store={store}>
        <CategoryItem item={item} />
      </Provider>
    );

    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });

  it("should apply the correct link when isFirstPage is true", () => {
    mockUseAppSelector.mockReturnValue(true);
    const item = comicsPreviewArray[0];

    render(
      <Provider store={store}>
        <CategoryItem item={item} />
      </Provider>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `${item.category}`);
  });

  it("should apply the correct link when isFirstPage is false", () => {
    mockUseAppSelector.mockReturnValue(false);
    const item = comicsPreviewArray[0];

    render(
      <Provider store={store}>
        <CategoryItem item={item} />
      </Provider>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `${item.category}/details/${item.id}`
    );
  });

  it("should apply the correct CSS class when isFirstPage is true", () => {
    mockUseAppSelector.mockReturnValue(true);
    const item = comicsPreviewArray[0];

    render(
      <Provider store={store}>
        <CategoryItem item={item} />
      </Provider>
    );

    const divElement = screen.getByRole("link").closest("div");
    expect(divElement).toHaveClass("category__item_firstPage");
  });

  it("should apply the correct CSS class when isFirstPage is false", () => {
    mockUseAppSelector.mockReturnValue(false);
    const item = comicsPreviewArray[0];

    render(
      <Provider store={store}>
        <CategoryItem item={item} />
      </Provider>
    );

    const divElement = screen.getByRole("link").closest("div");
    expect(divElement).toHaveClass("category__item");
  });

  it("should apply the correct CSS class when isSearch is true", () => {
    const item = comicsPreviewArray[0];

    render(
      <Provider store={store}>
        <CategoryItem item={item} isSearch={true} />
      </Provider>
    );

    const imgElement = screen.getByAltText(item.title);
    expect(imgElement).toHaveClass(`category__image__${item.category}`);
  });

  it("should pass correct props to the Image component", () => {
    const item = comicsPreviewArray[0];

    render(
      <Provider store={store}>
        <CategoryItem item={item} />
      </Provider>
    );

    const imgElement = screen.getByAltText(item.title);
    expect(imgElement).toHaveAttribute("src", item.imageLarge);
    expect(imgElement).toHaveAttribute("alt", item.title);
  });
});
