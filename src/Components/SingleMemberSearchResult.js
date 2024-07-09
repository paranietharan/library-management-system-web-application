import style from './style/SingleMemberSearchResult.module.css';

function SingleMemberSearchResult({ member, onSelectMember }) {
    return (
        <div className={style.container} onClick={() => onSelectMember(member)}>
            <p>User ID: {member.userID}</p>
            <p>First Name: {member.firstName}</p>
            <p>Last Name: {member.lastName}</p>
        </div>
    );
}

export default SingleMemberSearchResult;