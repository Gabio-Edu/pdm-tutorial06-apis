import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Post from '../model/entities/post';
import PostService from '../model/services/postService';

export const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchPosts() {
        try {
            let postService = new PostService();
            let posts = await postService.getPosts();
            setPosts(posts);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <Text>Carregando...</Text>;
    }
    if (error) {
        return <Text>Erro: {error}</Text>;
    }
    return (
        <View style={styles.container}>
            {posts.map(post => (
                <View key={post.id} style={styles.postItem}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postBody}>{post.body}</Text>
                </View>
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    postItem: {
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 6,
    },
    postBody: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
    },
});
