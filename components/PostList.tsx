import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Post {
    id: number;
    title: string;
    body: string;
}

export const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    function tratarAResposta(response: Response):Promise<any> {
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        return response.json();
    }

    function tratarOsDados(data: Post[]) {
        setPosts(data);
        setLoading(false);
    }

    function tratarErro(err: Error) {
        setError(err.message);
        setLoading(false);
    }


    useEffect(() => {
        let promessaDaResposta = fetch('https://jsonplaceholder.typicode.com/posts');
        let promessaDosDados = promessaDaResposta.then(tratarAResposta).catch(tratarErro);
        promessaDosDados.then(tratarOsDados).catch(tratarErro);
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={{height: 200}} />
                <Text>Carregando...</Text>
            </View>
        );
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
