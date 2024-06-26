import Loader from '../../../common/Loader';
import Sound from '../../../components/Source';
import useQueryUrl from '../../../hooks/useQueryUrl';
import useRestoreStateZustand from '../../../hooks/useRestoreStateZustand';
import useSound from '../../../hooks/useSound';
import WraperLayoutStudent from '../../../layout/WraperLayoutStudent';
import ButtonExercise from './components/ButtonExercise';
import {
  useCheckPermissonWithClassManagerLesson,
  useFetchDataByManagerLessonId,
} from './hooks';
import useVariable from './state';

function Variable() {
  const classManagerLessonId = useQueryUrl('classManagerLessonId');
  const { variables, restore } = useVariable();
  useCheckPermissonWithClassManagerLesson(classManagerLessonId);
  useFetchDataByManagerLessonId(classManagerLessonId);
  useRestoreStateZustand(restore);
  const { audio, handleChangeSource, audioSrc, setIsPlaying } = useSound();

  if (!variables || !classManagerLessonId) {
    return <Loader />;
  }

  return (
    <>
      {classManagerLessonId && (
        <WraperLayoutStudent
          iconHome={true}
          RightComponent={
            <ButtonExercise
              classManagerLessonId={Number(classManagerLessonId)}
            />
          }
        >
          {variables.length > 0 &&
            variables.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex p-2 m-2 rounded-lg border border-secondary text-black"
                >
                  <div className="flex flex-col">
                    <div>
                      <span>
                        <b className="mb-2 text-xl">{item.name}</b>
                      </span>

                      <span className="ml-2">
                        <i>vi:</i> <b>{item.vi}</b>
                      </span>
                    </div>

                    <Sound
                      handleChangeSound={handleChangeSource}
                      name={item.name}
                    />
                  </div>
                </div>
              );
            })}
          <audio
            id="audio"
            src={audioSrc || ''}
            ref={audio}
            onEnded={() => setIsPlaying(false)}
          />
        </WraperLayoutStudent>
      )}
    </>
  );
}

export default Variable;
