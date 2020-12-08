import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Chip, Grid, Paper } from '@material-ui/core';

import { AppDispatch } from '../../stores/store';
import { selectMyProfile } from '../../stores/slices/user.slice';
import {
  fetchApproveRequest,
  fetchCreateFollow,
  fetchDeleteFollow,
  selectFollowers,
  selectFollows,
} from '../../stores/slices/follow.slice';
import {
  resetApproveOrUnfollowButtomClicked,
  setApproveOrUnfollowButtomClicked,
  setSubHeaderTitle,
} from '../../stores/slices/page.slice';

import { PROPS_PROFILE } from '../../interfaces/component-props.interface';
import ConfirmationModal from '../modals/Confirmation.modal';
import ProfileEditModal from '../modals/ProfileEdit.modal';
import { ProfileStyles } from '../../styles/components/Profile.style';

const Profile: React.FC<PROPS_PROFILE> = ({ profile }) => {
  const classes = ProfileStyles();
  const dispatch: AppDispatch = useDispatch();
  const { id, displayName, avatar, about } = profile;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const avatarIcon =
    avatar === '' || null ? displayName.charAt(0).toUpperCase() : avatar;

  const myProfile = useSelector(selectMyProfile);
  const request = useSelector(selectFollows).find((f) => f.askTo === id);
  const isRequested: boolean = request !== undefined; // フレンド申請をしているかどうか(フォローしているかどうか)
  const foundByFollowes = useSelector(selectFollowers).find(
    (f) => f.askFrom === id
  );

  useEffect(() => {
    dispatch(setSubHeaderTitle('Profile'));
  }, []);

  const handleSendRequest = async () => {
    if (foundByFollowes) {
      // フレンド申請を送ったユーザから既に自分へフレンド申請が届いていた場合、
      // その申請を承認し、フレンドとして登録する
      dispatch(setApproveOrUnfollowButtomClicked());
      await dispatch(
        fetchApproveRequest({
          askFrom: foundByFollowes.askFrom,
          approved: 'true',
        })
      );
      await dispatch(fetchCreateFollow({ askTo: id, approved: 'true' }));
      dispatch(resetApproveOrUnfollowButtomClicked());
    } else {
      // 対象ユーザからフレンド申請が届いていない場合、申請のみを行う
      // 対象ユーザ側で承認された時にフレンドとして登録される
      await dispatch(fetchCreateFollow({ askTo: id, approved: 'false' }));
    }
  };

  const handleRemoveRequest = async () => {
    if (request) {
      await dispatch(fetchDeleteFollow(request.id));
    }
    setIsModalOpen(false);
  };

  const handleUnfollow = async () => {
    dispatch(setApproveOrUnfollowButtomClicked());
    if (request) {
      await dispatch(fetchDeleteFollow(request.id));
      await dispatch(
        fetchApproveRequest({
          askFrom: request.askTo,
          approved: 'false',
        })
      );
    }
    setIsModalOpen(false);
    dispatch(resetApproveOrUnfollowButtomClicked());
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Avatar className={classes.profAvatar}>{avatarIcon}</Avatar>
            </Grid>

            {/* ===================================
                マイプロフィールの場合Editボタン表示
            ==================================== */}
            {id === myProfile.id ? (
              <Grid item xs={12}>
                <Chip
                  clickable
                  color="primary"
                  label="Edit"
                  component="button"
                  className={classes.editButton}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                />

                {/* ===================================
                      Editボタンを押したときのモーダル
                ==================================== */}
                <ProfileEditModal
                  id={id}
                  displayName={displayName}
                  avatar={avatar}
                  about={about}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </Grid>
            ) : (
              // マイプロフィールの場合の要素ここまで
              /* ===================================
                    マイプロフィールではない場合
              ==================================== */
              <Grid item xs={12}>
                {!isRequested ? (
                  // パターン①：フレンド申請をしていない場合
                  <Chip
                    clickable
                    color="primary"
                    label="Send Friend Request"
                    component="button"
                    className={classes.requestButton}
                    onClick={handleSendRequest}
                  />
                ) : !request?.approved ? (
                  // パターン②：フレンド申請をしていて、承認されていない場合
                  <React.Fragment>
                    <Chip
                      clickable
                      color="primary"
                      variant="outlined"
                      label="Waiting for request approval"
                      component="button"
                      className={classes.requestButton}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    />
                    {/* ===================================
                    Waiting for request approvalボタンを押したときのモーダル
                    ==================================== */}
                    <ConfirmationModal
                      mainText="Do you want to remove the follow request ?"
                      selectionText="REMOVE"
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      handleModalFunction={handleRemoveRequest}
                    />
                  </React.Fragment>
                ) : (
                  // パターン③：フレンド申請をしていて、承認されている場合
                  <React.Fragment>
                    <Chip
                      clickable
                      color="primary"
                      label="Following"
                      component="button"
                      className={classes.requestButton}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    />
                    {/* ===================================
                        Unfollowボタンを押したときのモーダル
                    ==================================== */}
                    <ConfirmationModal
                      mainText="Do you want to unfollow ?"
                      selectionText="UNFOLLOW"
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      handleModalFunction={handleUnfollow}
                    />
                  </React.Fragment>
                )}
              </Grid>
              // マイプロフィールではない場合の要素ここまで
            )}
          </Grid>
          <Grid item container xs={9}>
            <Grid item xs={12} className={classes.name}>
              {displayName}
            </Grid>
            <Grid item xs={12}>
              {about}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Profile;
