import { FC, useEffect, useState } from 'react'
import styles from './Tag.module.css'

interface Props {
    post: Post[],
    onClickTags(item: string): void
}

export const Tags: FC<Props> = ({ post, onClickTags }) => {

    const [selectedTag, setSelectedTag] = useState('All')

    useEffect(() => {
        let tagElement = document.getElementsByTagName("span")
        for (let i = 0; i < tagElement.length; i++) {
            if (selectedTag === tagElement[i].innerText) {
                tagElement[i].id = 'tagSelected'
            } else {
                tagElement[i].id = ''
            }
        }
    }, [selectedTag])

    function getAllTags(post: Post[]) {
        const a = post.map((item) => item.tags)
        let tags: string[] = []
        for (let i = 0; i < a.length; i++) {
            tags = tags.concat(a[i]);
        }
        return Array.from(new Set(tags))
    }
    const tags = getAllTags(post)

    return (
        <div className={styles.container}>
            <p className="h5">Most popular Tags</p>
            <div>
                <span
                    className={styles.item_Tag}
                    onClick={() =>{
                        onClickTags("")
                        setSelectedTag("All")
                    }}
                >
                    All
                </span>
                {
                    tags[0] && tags.map((item, index) =>
                        <span
                            key={index}
                            className={styles.item_Tag}
                            onClick={() => {
                                onClickTags(item)
                                setSelectedTag(item)
                            }}
                        >
                            {item}
                        </span>
                    )
                }

            </div>
        </div>
    )
}
