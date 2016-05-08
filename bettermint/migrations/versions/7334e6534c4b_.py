"""empty message

Revision ID: 7334e6534c4b
Revises: None
Create Date: 2016-05-07 19:32:59.554479

"""

# revision identifiers, used by Alembic.
revision = '7334e6534c4b'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('UserToInstitution')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('UserToInstitution',
    sa.Column('id', sa.BIGINT(), server_default=sa.text('nextval(\'"UserToInstitution_id_seq"\'::regclass)'), nullable=False),
    sa.Column('user_id', sa.BIGINT(), autoincrement=False, nullable=False),
    sa.Column('institution', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('access_token', sa.VARCHAR(length=160), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], name='UserToInstitution_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='UserToInstitution_pkey'),
    sa.UniqueConstraint('user_id', 'institution', name='UserToInstitution_user_id_institution_key')
    )
    ### end Alembic commands ###
