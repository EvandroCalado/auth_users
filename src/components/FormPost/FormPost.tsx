import React, { useState } from 'react';
import { StrapiPost } from '../../pages/posts';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { Save } from '@styled-icons/material-outlined';

export type postProps = {
  id?: string;
  title: string;
  content: string;
};

export type FormPostProps = {
  onSave?: (post: postProps) => Promise<void>;
  post?: StrapiPost;
};

const FormPost = ({ post, onSave }: FormPostProps) => {
  const { id = '', attributes } = post || {};
  const { title = '', content = '' } = attributes || {};

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setSaving(true);
    event.preventDefault();

    if (onSave) {
      await onSave({ id, title: newTitle, content: newContent });
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="Title"
        label="Title"
        value={newTitle}
        onInputChange={(value) => setNewTitle(value)}
      />
      <TextInput
        name="Content"
        label="Content"
        value={newContent}
        onInputChange={(value) => setNewContent(value)}
        as="textarea"
      />
      <Button icon={<Save />} disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};

export default FormPost;
