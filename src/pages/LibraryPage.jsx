import { LibraryNavBar } from "../cmps/LibraryNavBar";
import { TagList } from "../cmps/TagList";

export function LibraryPage() {
    return (
        <section className="library-page">
            <LibraryNavBar />
            <TagList />
        </section>
    );
}
