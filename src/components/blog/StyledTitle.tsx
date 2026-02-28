/**
 * StyledTitle — renders a mixed-font title matching the Every.to style.
 *
 * Convention:  prefix any word with `_` in the title string and its
 * first letter will be rendered in Signifier (serif, italic, light weight).
 * All other text stays in the default font with its inherited weight.
 *
 * The key visual trick: the marked letters are NOT bold — they use
 * font-normal weight with italic serif, creating a striking contrast
 * against the bold sans/serif surrounding text.
 *
 * Example:
 *   title = "You Should _Never Go _Viral With Your AI App"
 *   →  "You Should " + <span class="font-serif italic font-light">N</span> + "ever Go "
 *      + <span class="font-serif italic font-light">V</span> + "iral With Your AI App"
 */

interface StyledTitleProps {
    title: string;
    className?: string;
}

export default function StyledTitle({ title, className = '' }: StyledTitleProps) {
    // Split by the _ marker while keeping delimiters
    const parts = title.split(/(_\S)/g);

    return (
        <span className={className}>
            {parts.map((part, i) => {
                // If this part starts with _ followed by a letter, style the letter
                if (part.startsWith('_') && part.length === 2) {
                    const letter = part[1];
                    return (
                        <span
                            key={i}
                            className="font-serif italic font-light"
                            style={{ fontStyle: 'italic', fontWeight: 300 }}
                        >
                            {letter}
                        </span>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </span>
    );
}
