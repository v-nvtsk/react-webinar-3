import { memo, useCallback, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useDispatch, useSelector as useReduxSelector, useStore as useReduxStore } from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import Comment from '../../components/comment';
import CommentList from '../../components/comment-list';
import Spinner from '../../components/spinner';

import commentActions from '../../store-redux/comment/actions';
import { useEffect } from 'react';
import CommentsHead from '../../components/comments-head';
import CommentAddForm from '../../components/comment-add-form';
import { useMemo } from 'react';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import shallowEqual from 'shallowequal';


function CommentsBlock(props) {

  // const [IsArticleAddFormShown, setIsArticleAddFormShown] = useState(true);
  const [formShownId, setFormShownId] = useState(props.articleId)
  const dispatch = useDispatch();


  const reduxSelect = useReduxSelector(state => ({
    comments: state.comment?.data?.items || [],
    commentsCount: state.comment?.data?.count || 0,
    waiting: state.comment.waiting
  }), shallowEqual);

  useEffect(() => {
    dispatch(commentActions.load(props.articleId))
  }, [props.articleId])
  // ============================================

  const select = useSelector(state => ({
    token: state.session.token,
    userId: state.session.user._id
  }));

  const callbacks = {
    onShowAddReplyForm: (id = props.articleId) => {
      setFormShownId(id);
    },
    onSubmitComment: ({ text, pid = props.articleId, pType }) => {
      if (text.trim().length === 0) return
      dispatch(commentActions.add(text, pid, pType, select.token))
      setFormShownId(props.articleId)
      // dispatch(commentActions.load(props.articleId))
    }
  }

  const commentsTree = useMemo(() => {
    if (reduxSelect.comments.length > 0) {
      return listToTree(reduxSelect.comments)[0]
    } else {
      return null;
    }
  }, [reduxSelect.comments]);

  const { t } = useTranslate();

  const renders = {
    form: useCallback(comment => {
      return (<>
        {formShownId === comment._id && <CommentAddForm
          comment={comment}
          pid={comment._id}
          pType={'comment'}
          token={select.token}
          level={comment.level}
          onSubmitComment={callbacks.onSubmitComment}
          onCancel={callbacks.onShowAddReplyForm}
          t={t} />}
      </>)

    }),
    comment: useCallback(comment => {
      return (<>
        <Comment currentUser={comment.author._id === select.userId} comment={comment} formShownId={formShownId}
          key={comment._id} onShowAddReplyForm={callbacks.onShowAddReplyForm} />
      </>)
    }, [formShownId, callbacks.addToBasket, select.token, t]),
  };

  return (
    <Spinner active={reduxSelect.waiting}>
      <CommentsHead commentsCount={reduxSelect.commentsCount} t />
      {commentsTree && <CommentList commentsTree={commentsTree} renderItem={renders.comment} renderForm={renders.form} t />}
      {formShownId === props.articleId && <CommentAddForm token={select.token} pType={'article'} level={-1} onSubmitComment={callbacks.onSubmitComment} t />}
    </Spinner>
  );
}

export default memo(CommentsBlock);
