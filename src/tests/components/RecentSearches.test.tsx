import RecentSearches from "../../components/RecentSearches/RecentSearches";
import { mockSearchData } from "../mock/searches";
import { render, screen } from "../testUtils";

describe("RecentSearches", () => {
  const defaultTitle = "Recent Searches";
  const params = {
    title: "My Recent Searches",
    list: mockSearchData,
    onItemClick: () => vi.fn(),
  };

  it("should display the locations field", () => {
    render(<RecentSearches {...params} />);
    const title = screen.getByText(params.title);
    expect(title).toBeInTheDocument();
  });

  it("should display default title if no title passed", () => {
    const noTitleParams = { ...params, title: undefined };
    render(<RecentSearches {...noTitleParams} />);
    const title = screen.getByText(defaultTitle);
    expect(title).toBeInTheDocument();
  });

  it("should display items in list", () => {
    render(<RecentSearches {...params} />);
    const item1 = screen.getByText(mockSearchData[0].name);
    expect(item1).toBeInTheDocument();

    const item2 = screen.getByText(mockSearchData[1].name);
    expect(item2).toBeInTheDocument();
  });

  it("should display items in list as buttons", () => {
    render(<RecentSearches {...params} />);
    const item1 = screen.getByRole("button", { name: mockSearchData[0].name });
    expect(item1).toBeInTheDocument();

    const item2 = screen.getByRole("button", { name: mockSearchData[1].name });
    expect(item2).toBeInTheDocument();
  });
});
