import React, { FC } from 'react'
import { Card } from 'react-bootstrap'
import styles from './Tag.module.css'

interface Props {
    post: any[],
    onClickTags(item: string): void
}

export const Tags: FC<Props> = ({ post, onClickTags }) => {
    function getAllTags(post: any[]) {
        const a = post.map((item) => item.tags)
        let tags: any[] = []
        for (let i = 0; i < a.length; i++) {
            tags = tags.concat(a[i]);
        }
        return Array.from(new Set(tags))
    }
    const tags = getAllTags(post)

    return (
        <div>
            <Card>
                <Card.Header as="h5">Tags</Card.Header>
                <Card.Body>
                    <Card.Text
                        className={styles.item_Tag}
                        onClick={() => onClickTags("")}
                    >
                        All
                    </Card.Text>
                    {
                        tags.map((item: string, index: number) => (
                            <Card.Text
                                key={index}
                                className={styles.item_Tag}
                                onClick={() => onClickTags(item)}
                            >
                                {item}
                            </Card.Text>
                        ))
                    }

                </Card.Body>
            </Card>
        </div>
    )
}